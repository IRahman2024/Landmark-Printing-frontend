
const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-[#d4c67f71] text-black text-sm p-10 font-openSans ">
                <aside>
                    <img className="rounded-full w-36" src="/landmarkPress logo.jpg" alt="" />
                    <p>
                        Landmark Printing Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title text-black">Head Office</h6>
                    <a className="">
                        70 Woodlands Drive <br />
                        Braeside, VIC 3195</a>
                    <a className="mt-10">(03) 9587 2226 <br />
                        sales@landmarkprinting.com.au</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-black">Socials</h6>
                    <a href="https://au.linkedin.com/company/landmark-printing" className="link link-hover">Linkedin</a>
                    <a href="https://www.facebook.com/landmarkprintingvic/" className="link link-hover">Facebook</a>
                    <a href="https://www.instagram.com/wixstudio/#" className="link link-hover">Instagram</a>
                    {/* <a className="link link-hover">Press kit</a> */}
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;