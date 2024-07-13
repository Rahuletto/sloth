import { Link } from 'next-view-transitions';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="px-20 py-12 prose min-h-screen w-full overflow-x-hidden" id="home">
      <div className='container max-w-[70vw] mx-auto mt-12 overflow-x-hidden' id="summary">
        <h5 className="md:text-5xl text-color border-0 text-3xl underline decoration-accent font-semibold font-mono"
          style={{ textDecorationSkipInk: "none", color: "var(--color)", border: "0px none" }}>Privacy Policy</h5>
        <p className='my-6 text-lg'>
          This privacy policy describes how <span className='text-accent font-medium'>sloth.</span> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
          uses, and discloses your information when you use our app.
        </p>

        <h2>Information Collected</h2>
        <p className='my-6 text-lg'>
          We collect two types of information through our app:
        </p>
        <ul className='mb-8'>
          <li className='my-4'>
            <strong>Information you provide:</strong> We do not collect any personal
            information directly through our app, Your unique ID and files you upload is used to store your summaries, files, flashcards and quiz data.
          </li>
          <li className='my-4'>
            <strong>Deletion of information:</strong> You can delete the files uploaded by deleting the _note_, or your data at any time by deleting your account. This will remove all your data from our servers.
          </li>
          <li className='my-4'>
            <strong>Information collected by Gemini API:</strong> Our app utilizes Gemini
            API, a large language model from Google. When you interact with
            Sloth, Gemini API may collect information such as your file content,
            generated responses, and usage information (e.g., frequency of
            use). You can find more details about how Gemini API handles user
            data in their{' '}
            <a href="https://ai.google.dev/gemini-api/terms">Additional Terms of Service</a>.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p className='my-6 text-lg'>
          We do not use any information collected directly through our app. The
          information collected by Gemini API is used by Google to improve and
          develop Gemini API and other machine learning technologies.
        </p>

        <h2>Disclosure of Your Information</h2>
        <p className='my-6 text-lg'>
          We do not share any information collected through our app with any
          third-party except Google, through their use of Gemini API as
          described above.
        </p>

        <h2>Data Security</h2>
        <p className='my-6 text-lg'>
          We take reasonable steps to protect the information transmitted through
          our app. However, no internet or electronic transmission is completely
          secure, so we cannot guarantee the security of your information.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p className='my-6 text-lg'>
          We may update our privacy policy from time to time. We will notify you
          of any changes by posting the new privacy policy on our app.
        </p>

        <h2>Contact Us</h2>
        <p className='my-6 text-lg'>
          If you have any questions about this privacy policy, please contact
          us at <Link className='text-accent underline' href="mailto:rahulmarban@gmail.com">rahulmarban@gmail.com</Link>.
        </p>
      </div>
    </main>
  )
}
