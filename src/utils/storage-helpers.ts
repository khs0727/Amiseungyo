const getStorageKey = (userId: string, type: 'theme' | 'game' | 'auth' | 'highlight') =>
  `${type}-storage-${userId}`;
