import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
export const Contact = () => {
  return <section id="contact" className="py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Get in Touch
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-stone-100">
            <div className="w-12 h-12 bg-red-700/10 rounded-full flex items-center justify-center mb-4">
              <MailIcon size={24} className="text-red-700" />
            </div>
            <h3 className="text-lg text-stone-800 mb-2">Email</h3>
            <p className="text-stone-600 text-center">sumijoshi60@gmail.com</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-stone-100">
            <div className="w-12 h-12 bg-red-700/10 rounded-full flex items-center justify-center mb-4">
              <PhoneIcon size={24} className="text-red-700" />
            </div>
            <h3 className="text-lg font-medium text-stone-800 mb-2">Phone</h3>
            <p className="text-stone-600 text-center"> +977 9840875038</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-stone-100">
            <div className="w-12 h-12 bg-red-700/10 rounded-full flex items-center justify-center mb-4">
              <MapPinIcon size={24} className="text-red-700" />
            </div>
            <h3 className="text-lg font-medium text-stone-800 mb-2">
              Location
            </h3>
            <p className="text-stone-600 text-center">Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
          <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
            {/* Hidden field for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot field for spam protection - hidden from users */}
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm text-stone-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-stone-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm text-stone-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700"
                placeholder="Subject"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm text-stone-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors duration-300">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>;
};