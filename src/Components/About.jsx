
import React from "react";
import "./about.css";
import imagexe from '../Assets/aboutPageBg.png'
const About = () => {
    return (
        <><img src={imagexe} className='h-full w-full  top-0 left-0 right-0 bottom-0 p-0 fixed object-cover z-[-2] opacity-90 ' alt="" />
            <div className=" _About w-full h-4/5 flex justify-start items-center">

                <div className="About">
                    <h2 className=" ">About Us :</h2>
                    <div className="">
                        <h3 className=" ">Experience :</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos et iure
                            quam, quasi id sunt consequuntur soluta facilis saepe dolores quidem
                            corrupti non! Corrupti nam perspiciatis repudiandae quam, ex labore.
                        </p>
                    </div>
                    <div>
                        <h3>Team :</h3>
                        <p>
                            <div>
                                <strong>Anurag Kumar Jha </strong>
                                <li>Team Leader</li>
                                <li>Made and Integrated Backend</li>
                                <li>Made 90% fronted</li>
                                <li>Made all the Apis and Tested Them</li>
                            </div>
                            <div className="mt-5">
                                <strong>Devesh Suthar</strong>
                                <li>Team Member</li>
                                <li>Fixed Css</li>
                                <li>Made About Page</li>
                                <li>Made Contact Page</li>
                            </div>

                        </p>

                    </div>
                    <div>
                        <h3>Companies :</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                            corporis voluptatum explicabo placeat, laudantium, cumque accusamus
                            facilis pariatur rerum ratione ducimus exercitationem inventore,
                            quam ab adipisci sed eligendi nam? Eligendi, omnis quasi?
                        </p>
                    </div>
                    <div>
                        <h3>Partners & Sponsors :</h3>
                        <p className="">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
                            consequuntur reprehenderit accusantium porro, dicta veritatis ea
                            praesentium assumenda. Doloremque doloribus nemo temporibus,
                            dignissimos earum adipisci blanditiis modi facere reprehenderit sed
                            eum in quisquam voluptate tenetur!
                        </p>
                    </div>

                </div>

                <div className="links">
                    <div>
                        <a href="twitter.com" target="_blank"></a>
                        <a href="https://www.instagram.com/anuragchasingstars/" target="_blank"></a>
                        <a href="https://www.facebook.com" target="_blank"></a>
                        <a href="https://www.youtube.com" target="_blank"></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;

