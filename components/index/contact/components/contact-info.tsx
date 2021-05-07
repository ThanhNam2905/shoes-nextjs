import { FaAddressBook, FaPhoneAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";

export default function ContactInfo(props) {
    return (
        <>
            <div>
                <h3 className="text-20 md:text-22 tracking-wide">Contact Us</h3>
                <div className="divide-y divide-gray-200">
                    <p className="text-14 md:text-15 leading-6 mt-3 md:mt-5 pb-5">
                        Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica,
                        quam nunc putamus parum claram anteposuerit litterarum formas human. qui sequitur mutationem consuetudium lectorum. Mirum est notare quam
                        </p>
                    <div className="flex items-baseline lg:items-center py-4">
                        <FaAddressBook className="text-14 md:text-16 w-6 mr-1 lg:mr-2.5" />
                        <p className="text-14 md:text-16">Address : No 40 Baria Sreet 133/2 NewYork City</p>
                    </div>
                    <div className="flex items-baseline lg:items-center py-4">
                        <FaPhoneAlt className="text-12 md:text-14 w-6 mr-1 lg:mr-2.5" />
                        <a href="tel:0942898298" className="text-14 md:text-16">Phone : 0942898298</a>
                    </div>
                    <div className="flex items-center lg:items-center py-4">
                        <GoMail className="text-16 md:text-18 w-6 mr-1 lg:mr-2.5" />
                        <a href="mailto:thanhnam290596@gmail.com" className="text-14 md:text-16">Email : thanhnam290596@gmail.com</a>
                    </div>
                </div>
            </div>
        </>
    )
}