import {create} from 'zustand';
import api from './api';
import secure from './secure';
import {ADDRESS} from './api';

//-------------------------------------------
//       Socket receive message handlers
//-------------------------------------------

function responseFriendList(set, get, friendList) {
  set(state => ({
    friendList: friendList,
  }));
}

function responseFriendNew(set, get, friend) {
  const friendList = [friend, ...get().friendList];
  set((state) => ({
    friendList: friendList
  }))
}


function responseMessageList(set, get, data) {
  set(state => ({
    messagesList: [...get().messagesList, ...data.messages],
    messagesNext: data.next,
    messagesUsername : data.friend.username
  }));
}

function responseMessageSend(set, get, data) {
  const username = data.friend.username;
  // Move friendList item for this friend to the start of list, update the preview text and the time stamp
  const friendList = [...get().friendList];
  const friendIndex = friendList.findIndex(
    item => item.friend.username === username,
  );

  if (friendIndex >= 0) {
    const item = friendList[friendIndex];
    item.preview = data.message.text;
    item.updated = data.message.created;
    friendList.splice(friendIndex, 1);
    friendList.unshift(item);

    set(state => ({
      friendList: friendList,
      messagesTyping: null,
    }));

    // If the message data does not belong to this friend then message list, as a fresh messageList will be loaded when the user opens the correct chat window

    if(username !== get().messagesUsername) {
      return
    }
  }

  const messagesList = [data.message, ...get().messagesList];
  set(state => ({
    messagesList: messagesList,
  }));
}

function responseMessageType(set, get, data) {
  if(data.username !== get().messagesUsername) return

  set((state) => ({
    messagesTyping:new Date()
  }))
}


function responseRequestConnect(set, get, connection) {
  const user = get().user;
  // If i was the one that made the connect request
  // update the search list row
  if (user.username === connection.sender.username) {
    const searchList = [...get().searchList];
    const searchIndex = searchList.findIndex(
      request => request.username === connection.receiver.username,
    );

    if (searchIndex >= 0) {
      searchList[searchIndex].status = 'pending-them';
      set(state => ({
        searchList: searchList,
      }));
    }

    // If they were the one that sent the connect request, add request to request list
  } else {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      request => request.sender.username === connection.sender.username,
    );

    if (requestIndex === -1) {
      requestList.unshift(connection);
      set(state => ({
        requestList: requestList,
      }));
    }
  }
}

function responseRequestAccept(set, get, connection) {
  const user = get().user;

  // If I was the one that accepted the request, remove request from the request list
  if (user.username === connection.receiver.username) {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      request => request.id === connection.id,
    );

    if (requestIndex >= 0) {
      requestList.splice(requestIndex, 1);
      set(state => ({
        requestList: requestList,
      }));
    }
  }

  // If the corresponding user is contained within the search list for the acceptor or the accepted, update the state of the search list item
  const sL = get().searchList;
  if (sL === null) return;

  const searchList = [...sL];

  let searchIndex = -1;

  // if this user accepted
  if (user.username === connection.receiver.username) {
    searchIndex = searchList.findIndex(
      user => user.username === connection.sender.username,
    );

    // If the other user accepted
  } else {
    searchIndex = searchList.findIndex(
      user => user.username === connection.receiver.username,
    );
  }

  if (searchIndex >= 0) {
    searchList[searchIndex].status = 'connected';
    set(state => ({
      searchList: searchList,
    }));
  }
}

function responseRequestList(set, get, requestList) {
  set(state => ({
    requestList: requestList,
  }));
}

function responseSearch(set, get, data) {
  set(state => ({
    searchList: data,
  }));
}

function responseThumbnail(set, get, data) {
  set(state => ({
    user: data,
  }));
}

const useGlobal = create((set, get) => ({

  //----------------------------
  //       Initialization
  //----------------------------

  initialized: false,
  init: async () => {
    const credentials = await secure.get('credentials');

    if (credentials) {
      try {
        const response = await api({
          method: 'POST',
          url: '/chat/signin/',
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (response.status !== 200) {
          throw 'Authentication Error!';
        }

        const user = response.data.user;
        const tokens = response.data.tokens;

        secure.set('tokens', tokens);

        set(state => ({
          initialized: true,
          authenticated: true,
          user: user,
        }));
        return;
      } catch (error) {
        console.log('Use global init error', error);
      }
    }
    set(state => ({
      initialized: true,
    }));
  },

  //----------------------------
  //       Authentication
  //----------------------------
  authenticated: false,
  user: {},

  login: (credentials, user, tokens) => {
    secure.set('credentials', credentials);
    secure.set('tokens', tokens);
    set(state => ({
      authenticated: true,
      user: user,
    }));
  },

  logout: () => {
    secure.wipe();
    set(state => ({
      authenticated: false,
      user: {},
    }));
  },

  //----------------------------
  //       Web Socket
  //----------------------------

  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get('tokens');

    const url = `ws://${ADDRESS}/chat/?token=${tokens.access}`;

    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('socket onopen');
      socket.send(
        JSON.stringify({
          source: 'request.list',
        }),
      );

      socket.send(
        JSON.stringify({
          source: 'friend.list',
        }),
      );
    };

    socket.onmessage = event => {
      // convert data to javascript object

      const parsed = JSON.parse(event.data);

      console.log('onmessage', parsed);

      const responses = {
        'friend.list': responseFriendList,
        'friend.new': responseFriendNew,
        'message.send': responseMessageSend,
        'message.type': responseMessageType,
        'message.list': responseMessageList,
        'request.accept': responseRequestAccept,
        'request.list': responseRequestList,
        'request.connect': responseRequestConnect,
        'search': responseSearch,
        'thumbnail': responseThumbnail,
      };

      const resp = responses[parsed.source];
      if (!resp) {
        console.log('parsed.source "' + parsed.source + '" not found !');
        return;
      }

      // call response function
      resp(set, get, parsed.data);
    };

    socket.onerror = e => {
      console.log('socket onerror', e.message);
    };

    socket.onclose = () => {
      console.log('socket onclose');
    };

    set(state => ({
      socket: socket,
    }));

    console.log('Tokens : ', tokens);
  },

  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set(state => ({
      socket: null,
    }));
  },

  //----------------------------
  //       Search
  //----------------------------
  searchList: null,
  searchUsers: query => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: 'search',
          query: query,
        }),
      );
    } else {
      set(state => ({
        searchList: null,
      }));
    }
  },

  //----------------------------
  //       Friends
  //----------------------------
  friendList: null,

  //----------------------------
  //       Messages
  //----------------------------

  messagesList: [],
  messagesNext: null,
  messagesTyping: null,
  messagesUsername : null, 

  messageList: (connectionId, page = 0) => {
    if (page === 0) {
      set(state => ({
        messagesList: [],
        messagesNext: null,
        messagesTyping: null,
        messagesUsername: null,
      }));
    }else{
      set(state => ({
        messagesNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'message.list',
        connectionId: connectionId,
        page: page,
      }),
    );
  },

  messageSend: (connectionId, message) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'message.send',
        connectionId: connectionId,
        message: message,
      }),
    );
  },


  messageType: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'message.type',
        username: username,
      }),
    );
  },

  //----------------------------
  //       Requests
  //----------------------------
  requestList: null,

  requestAccept: username => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'request.accept',
        username: username,
      }),
    );
  },

  requestConnect: username => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'request.connect',
        username: username,
      }),
    );
  },

  //----------------------------
  //       Thumbnail
  //----------------------------

  uploadThumbnail: file => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: 'thumbnail',
        base64: file.base64,
        filename: file.fileName,
      }),
    );
  },
}));

export default useGlobal;
