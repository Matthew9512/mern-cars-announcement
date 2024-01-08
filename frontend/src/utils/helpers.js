import { formatDistanceStrict } from 'date-fns';

export const formatPrice = function (price) {
   return new Intl.NumberFormat().format(price);
};

export const formatTime = function (time) {
   return formatDistanceStrict(new Date(time), new Date(), { addSuffix: true });
};

export const formatResData = function (resData) {
   let resDataCopy = {};
   Object.entries(resData).map(([key, value]) => {
      switch (key) {
         case 'engineCapacity':
            resDataCopy['engine capacity'] = `${(+value / 1000).toFixed(1)} cm3`;
            break;
         case 'horsePower':
            resDataCopy['horse power'] = `${value} HP`;
            break;
         case 'price':
            resDataCopy[key] = `${formatPrice(value)} €`;
            break;
         case 'transmitionType':
            resDataCopy['transmition type'] = value;
            break;
         case 'year':
            resDataCopy['production year'] = value;
            break;
         case 'active':
            break;
         default:
            resDataCopy[key] = value;
      }
   });

   return resDataCopy;
};

export const getLS = function () {
   return localStorage.getItem('car__ads') ? JSON.parse(localStorage.getItem('car__ads')) : [];
};

// data of chat members for creating message
export const chatMembersData = function (currentChatMsg, user) {
   // find name of reciver
   const reciversName = [currentChatMsg?.chatMembers?.reciverName, currentChatMsg?.chatMembers?.senderName].find(
      (name) => name !== user?.username
   );
   // find avatar of reciver
   const reciversAvatar = [currentChatMsg?.chatMembers?.reciverAvatar, currentChatMsg?.chatMembers?.senderAvatar].find(
      (avatar) => avatar !== user?.usersAvatar
   );

   return { reciversName, reciversAvatar };
};

// data of chat members for creating contact item
export const contactItemData = function (user, chat, arrivalMessage) {
   const username = user?.username === chat?.reciverName ? chat?.senderName : chat?.reciverName;
   const checkArrMsg = arrivalMessage && chat?.members.includes(arrivalMessage?.senderId);

   return { username, checkArrMsg };
};
