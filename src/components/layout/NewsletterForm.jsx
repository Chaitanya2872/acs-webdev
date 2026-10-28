import useFormSubmit from '../../hooks/useFormSubmit';

export default function NewsletterForm() {
  // forms/newsletter.php follows the BootstrapMade "PHP Email Form" convention of replying "OK".
  const { onSubmit, status, error } = useFormSubmit('/forms/newsletter.php', 'OK');

  return (
    <form className="php-email-form" onSubmit={onSubmit}>
      <div className="ft-subscribe">
        <i className="bi bi-envelope" aria-hidden="true" />
        <input type="email" name="email" required placeholder="you@company.com" aria-label="Email address" />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && <div className="error-message d-block">{error}</div>}
      {status === 'sent' && <div className="sent-message d-block">You&apos;re subscribed. Thank you!</div>}
    </form>
  );
}
