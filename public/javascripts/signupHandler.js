document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fornavn = document.getElementById('fornavn').value.trim();
    const epost = document.getElementById('epost').value.trim();
    const passord = document.getElementById('passord').value;

    const meldingEl = document.getElementById('melding');
    meldingEl.textContent = '';

    try {
        const res = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fornavn, epost, passord })
        });

        const data = await res.json();
        if (res.ok) {
            meldingEl.textContent = data.message || 'Bruker opprettet.';
            setTimeout(() => { window.location.href = '/login'; }, 1000);
        } else {
            meldingEl.textContent = data.message || 'Noe gikk galt.';
        }
    } catch (err) {
        console.error(err);
        meldingEl.textContent = 'Nettverksfeil';
    }
});
