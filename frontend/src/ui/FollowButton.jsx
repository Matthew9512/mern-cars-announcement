import { heartIconFilled, heartIconOutline } from '../utils/icons';

function FollowButton({ item, position, follow, handleFollow }) {
   return (
      <div
         onClick={handleFollow}
         data-id={item?._id}
         data-follow={follow}
         className={`${position} flex-center gap-2 border-b hover:cursor-pointer hover:opacity-70 text-lg`}
      >
         <span>{follow ? heartIconFilled : heartIconOutline}</span>
         <p>{follow ? 'stop follow' : 'follow'}</p>
      </div>
   );
}

export default FollowButton;
