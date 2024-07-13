import { Link } from 'next-view-transitions';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 prose">
      <h1 className='text-3xl text-accent border-b border-box w-full'>Privacy Policy</h1>
      <p>
        This privacy policy describes how sloth. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
        uses, and discloses your information when you use our app.
      </p>

      <h2>Information Collected</h2>
      <p>
        We collect two types of information through our app:
      </p>
      <ul>
        <li>
          <strong>Information you provide:</strong> We do not collect any personal
          information directly through our app, Your unique ID and files you upload is used to store your summaries, files, flashcards and quiz data.
          <strong>Deletion of information:</strong> You can delete the files uploaded by deleting the _note_, or your data at any time by deleting your account. This will remove all your data from our servers.
        </li>
        <li>
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
      <p>
        We do not use any information collected directly through our app. The
        information collected by Gemini API is used by Google to improve and
        develop Gemini API and other machine learning technologies.
      </p>

      <h2>Disclosure of Your Information</h2>
      <p>
        We do not share any information collected through our app with any
        third-party except Google, through their use of Gemini API as
        described above.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable steps to protect the information transmitted through
        our app. However, no internet or electronic transmission is completely
        secure, so we cannot guarantee the security of your information.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our privacy policy from time to time. We will notify you
        of any changes by posting the new privacy policy on our app.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact
        us at <Link href="mailto:rahulmarban@gmail.com">rahulmarban@gmail.com</Link>.
      </p>
    </div>
  )
}
