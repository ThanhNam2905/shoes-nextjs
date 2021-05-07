

export default function ContactForm(props) {
    return (
        <>
            <h3 className="text-20 md:text-22 tracking-wide">Tell Us Your Project</h3>
            <div className="h-auto mt-3 md:mt-5">
                <form method="POST" className="">
                    <div>
                        <label className="block text-14 md:text-15 mb-2">Your Name (required)</label>
                        <input type="text" className="border border-gray-200 text-14 md:text-15 py-1.5 md:py-2.5 w-full rounded px-3 mb-4" placeholder="Name *" />
                    </div>
                    <div>
                        <label className="block text-14 md:text-15 mb-2">Your Email (required)</label>
                        <input type="email" className="border border-gray-200 text-14 md:text-15 py-1.5 md:py-2.5 w-full rounded px-3 mb-4" placeholder="Email *" />
                    </div>
                    <div>
                        <label className="block text-14 md:text-15 mb-2">Subject</label>
                        <input type="text" className="border border-gray-200 text-14 md:text-15 py-1.5 md:py-2.5 w-full rounded px-3 mb-4" placeholder="Subject" />
                    </div>
                    <div>
                        <label className="block text-14 md:text-15 mb-2">Your Message</label>
                        <textarea name="mess" id="mess" className="border border-gray-200 text-14 md:text-15 py-1.5 md:py-2.5 w-full rounded px-3 mb-4 h-48 focus:outline-none" placeholder="Message *"></textarea>
                    </div>
                    <div >
                        <input type="submit" value="Send" className="btn btn--send text-white bg-gray-900 hover:bg-red-600 py-2 mt-1 md:mt-2.5 ml-0 md:ml-3" />
                    </div>
                </form>
            </div>
        </>
    )
}