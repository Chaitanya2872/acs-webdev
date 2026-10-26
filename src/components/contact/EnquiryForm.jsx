import { useState } from 'react';

import useFormSubmit from '../../hooks/useFormSubmit';

function Field({ field, formId }) {
  const id = `${formId}-${field.name}`;
  const label = `${field.label}${field.required ? '*' : ''}`;
  const common = { id, name: field.name, required: field.required, placeholder: field.placeholder };
  const [fileName, setFileName] = useState('');

  if (field.type === 'file') {
    return (
      <>
        <span className="upload-label d-block">{field.label}</span>
        <label htmlFor={id} className="custom-file-upload">
          {fileName || '+ Upload File'}
          <input type="file" id={id} name={field.name} onChange={(e) => setFileName(e.target.files[0]?.name ?? '')} />
        </label>
      </>
    );
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {field.type === 'textarea' && <textarea className="contact-form-textarea" {...common} />}
      {field.type === 'select' && (
        <select className="contact-form-input" defaultValue="" {...common}>
          <option value="" disabled />
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {!['textarea', 'select'].includes(field.type) && <input className="contact-form-input" type={field.type ?? 'text'} {...common} />}
    </>
  );
}

export default function EnquiryForm({ form }) {
  const { onSubmit, status, error } = useFormSubmit('/contact_form.php', 'Success');

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h2 className="mt-3">{form.label}</h2>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="row">
              {form.fields.map((field) => (
                <div key={field.name} className={`${field.col ?? 'col-md-12'} contact-input-container`}>
                  <Field field={field} formId={form.id} />
                </div>
              ))}
            </div>
            <button className="contact-form-button" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
            {status === 'sent' && <p className="form-status form-status-success">Thank you! Your message has been sent.</p>}
            {status === 'error' && <p className="form-status form-status-error">Sorry, we couldn&apos;t send your message. {error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
