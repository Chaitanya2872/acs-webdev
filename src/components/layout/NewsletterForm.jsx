import useFormSubmit from '../../hooks/useFormSubmit';

export default function NewsletterForm() {
  // forms/newsletter.php follows the BootstrapMade "PHP Email Form" convention of replying "OK".
  const { onSubmit, status, error } = useFormSubmit('/forms/newsletter.php', 'OK');

  return (
    <form className="php-email-form" onSubmit={onSubmit}>
      <div className="newsletter-form">
        <input type="email" name="email" required aria-label="Email address" />
        <input type="submit" value="Subscribe" disabled={status === 'sending'} />
      </div>
      {status === 'sending' && <div className="loading d-block">Loading</div>}
      {status === 'error' && <div className="error-message d-block">{error}</div>}
      {status === 'sent' && <div className="sent-message d-block">Your subscription request has been sent. Thank you!</div>}
    </form>
  );
}
