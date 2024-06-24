import {Platform} from 'react-native';
import ProfileImage from '../assets/images/profile-picture.png';
import {ADDRESS} from './api';

function thumbnail(url) {
  if (!url) {
    return ProfileImage;
  }

  return {
    uri: 'http://' + ADDRESS + url,
  };
}

function formatTime(date) {
  if (date === null) {
    return '-';
  }
  const now = new Date();
  const s = Math.abs(now - new Date(date)) / 1000;

  // Seconds
  if (s < 60) {
    return 'now';
  }

  // Minutes
  if (s < 3600) {
    const m = Math.floor(s / 60);
    return `${m}m ago `;
  }

  // Hours
  if (s < 86400) {
    const h = Math.floor(s / 3600);
    return `${h}h ago`;
  }

  // Days
  if (s < 604800) {
    const d = Math.floor(s / 86400);
    return `${d}d ago`;
  }

  // Weeks
  if (s < 2419200) {
    const w = Math.floor(s / 604800);
    return `${w}w ago`;
  }

  //Years
  if (s < 31536000) {
    const y = Math.floor(s / 2419200);
    return `${y}y ago`;
  }

  return '*';
}

export default {
  log,
  thumbnail,
  formatTime,
};
