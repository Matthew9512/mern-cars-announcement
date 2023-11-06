import { FaCar, FaPhotoVideo } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { BsFuelPump, BsFillTelephoneFill, BsFillPersonFill } from 'react-icons/bs';
import { PiCaretCircleDoubleUpBold, PiEngineLight } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import {
   AiOutlineGithub,
   AiOutlineLinkedin,
   AiOutlineLoading3Quarters,
   AiOutlineCloseCircle,
   AiOutlineHeart,
} from 'react-icons/ai';

// import { SiKia } from 'react-icons/si';

export const carIcon = <FaCar style={{ color: '#2B59FF' }} />;
export const searchIcon = <CiSearch style={{ width: '24px', height: '20px' }} />;
export const fuelIcon = <BsFuelPump />;
export const transmissionIcon = <PiCaretCircleDoubleUpBold />;
export const engineIcon = <PiEngineLight />;
export const githubIcon = <AiOutlineGithub />;
export const linkedInIcon = <AiOutlineLinkedin />;
export const loadingSpinnerIcon = <AiOutlineLoading3Quarters className='animate-spin' />;
export const closeIcon = <AiOutlineCloseCircle style={{ width: '18px', height: '18px' }} />;
export const heartIcon = <AiOutlineHeart style={{ width: '18px', height: '18px' }} />;
export const imagesIcon = <FaPhotoVideo style={{ width: '18px', height: '18px' }} />;
export const telIcon = <BsFillTelephoneFill style={{ width: '18px', height: '18px' }} />;
export const personIcon = <BsFillPersonFill style={{ width: '18px', height: '18px' }} />;
export const cityIcon = <FaLocationDot style={{ width: '18px', height: '18px' }} />;

// export const carBrandIcon = <SiKia />;
