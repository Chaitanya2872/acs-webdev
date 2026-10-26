import { useState } from 'react';

import submitForm from '../lib/submitForm';

// Returns an onSubmit handler plus status ('idle' | 'sending' | 'sent' | 'error') for a PHP-backed form.
export default function useFormSubmit(endpoint, successReply) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    setError('');
    try {
      await submitForm(endpoint, new FormData(form), successReply);
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return { onSubmit, status, error };
}
