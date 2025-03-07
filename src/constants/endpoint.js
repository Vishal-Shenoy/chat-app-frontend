export const BASE_END_POINT = "http://localhost:3001";

export const registerEndPoint = () => `${BASE_END_POINT}/user/register`;

export const loginEndPoint = () => `${BASE_END_POINT}/user/login`;

export const refreshEndPoint = () => `${BASE_END_POINT}/refresh`;

export const searchEndPoint = (id, key) => `${BASE_END_POINT}/user/${id}/${key}`;

export const addFriendEndPoint = () => `${BASE_END_POINT}/request/createRequest`;

export const deleteRequestEndPoint = () => `${BASE_END_POINT}/request/deleteRequest`;

export const getMyRequestEndPoint = (id) => `${BASE_END_POINT}/request/getMyRequests/${id}`;

export const deleteMyRequestEndPoint = (id) => `${BASE_END_POINT}/request/deleteRequest/${id}`;

export const acceptMyRequestEndPoint = (id) => `${BASE_END_POINT}/request/acceptRequest/${id}`;

export const getMyFriendsEndPoint = (id) => `${BASE_END_POINT}/friend/getFriends/${id}`;