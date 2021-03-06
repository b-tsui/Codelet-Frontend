// import React from 'react'
// import AnimatedSplash from "react-native-animated-splash-screen";

// export default function Loading() {
//     return (
//         <AnimatedSplash
//             translucent={true}
//             isLoaded={false}
//             logoImage={require("../images/logo.png")}
//             backgroundColor={"#18212b"}
//             logoHeight={150}
//             logoWidth={150}
//         />
//     )
// }

import React from 'react'
import logo from '../images/logo.png'
import '../styles/loading-page.css'

export default function Loading() {
    return (
        <div className='loading-image-container'>
            <img src={logo} alt='Codelet logo' className='rotate load-logo' />
            <img src={logo} alt='Codelet logo' className='rotate load-logo' />
            <img src={logo} alt='Codelet logo' className='rotate load-logo' />
        </div>
    )
}