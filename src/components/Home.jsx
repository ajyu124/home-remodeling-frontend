import { imageUrl } from '../constants';

function Home() {
  return (
    <img src={imageUrl + '/home.jpg'} width="900" height="600" alt="home" />
  );
}

export default Home;
