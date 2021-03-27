import React from 'react'
import SinglePicture from './SinglePicture'
import ImageScroller from 'react-image-scroller';

const Pictures = () => {
    return (
        <div className="PictureContainer">

            <SinglePicture/>
            <SinglePicture/>
            <SinglePicture/>

        </div>
    )
}

export default Pictures
