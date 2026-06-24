export default function ApiLoadingNotice({ slow = false, retryAttempt = 0 }) {
  if (!slow && retryAttempt === 0) return null;

  return (
    <p className="mb-6 text-center text-sm text-venus-grey" role="status" aria-live="polite">
      {retryAttempt > 0
        ? `Server is waking up… retrying (${retryAttempt}/3)`
        : "Connecting to server, this may take up to a minute on first visit…"}
    </p>
  );
}
