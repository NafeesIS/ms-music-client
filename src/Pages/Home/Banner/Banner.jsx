import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import './Banner.css'
const Banner = () => {
    return (

        <div className='mb-12'>
            <AwesomeSlider className='mb-12'>
                <div className="slider-item">
                    <img src="https://previews.123rf.com/images/omgimages/omgimages1012/omgimages101200054/8453951-male-teacher-playing-guitar-with-pupils-having-music-lesson-in-classroom.jpg" alt="Image 1" className="object-cover" />
                    <h2 className="legend-left text-black">Discover the <br /> Joy of Music</h2>
                </div>
                <div className="slider-item">
                    <img src="https://previews.123rf.com/images/bialasiewicz/bialasiewicz1705/bialasiewicz170501233/78504162-kindergarten-teacher-showing-kids-how-to-play-the-guitar.jpg" alt="Image 3" className="object-cover" />
                    <h2 className="legend-left text-green-400">Experience the <br /> Power of  Harmony</h2>
                </div>
                <div className="slider-item">
                    <img src="https://www.westend61.de/images/0000809817pw/pre-school-teacher-showing-a-guitar-to-children-in-kindergarten-MFF04096.jpg" alt="Image 4" className="object-cover" />
                    <h2 className="legend-left text-pink-700">Embrace the <br /> Rhythm of Life</h2>
                </div>
                <div className="slider-item">
                    <img src="https://www.westend61.de/images/0000809803pw/children-and-teachers-singing-and-making-music-in-kindergarten-MFF04082.jpg" alt="Image 5" className="object-cover" />
                    <h2 className="legend-left text-cyan-600">Elevate Your <br /> Musical Journey</h2>
                </div>
            </AwesomeSlider>
        </div>

    );
};

export default Banner;
