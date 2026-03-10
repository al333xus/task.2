
const searchIndex = {
  kittens: 'Open the Cats page for kitten feeding and early growth guidance.',
  senior: 'Open the Cats page for senior cat nutrition guidance.',
  exercise: 'Open the Dogs page for exercise recommendations and activity ideas.',
  grooming: 'Open the Dogs page for grooming and handling guidance.',
  bird: 'Open the Bird Care page for bird health, behavior, and enrichment guidance.',
  consultation: 'Open the Consultation page to request a virtual appointment with a Pexpert.',
  faq: 'Open the FAQs page to review common questions from prospective pet owners.'
};

function setupSearch(){
  document.querySelectorAll('[data-search]').forEach(box => {
    const input = box.querySelector('[data-search-input]');
    const btn = box.querySelector('[data-search-btn]');
    const result = box.querySelector('[data-search-result]');
    if(!input || !btn || !result) return;
    const run = () => {
      const q = input.value.trim().toLowerCase();
      if(!q){ result.textContent = 'Try: kittens, senior, exercise, grooming, bird, consultation, or faq.'; return; }
      const match = Object.keys(searchIndex).find(k => q.includes(k));
      result.textContent = match ? searchIndex[match] : 'No direct match found in this prototype. Try another pet-care keyword.';
    };
    btn.addEventListener('click', run);
    input.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); run(); }});
  });
}

function setupConsultForm(){
  const form = document.querySelector('[data-consult-form]');
  const box = document.querySelector('[data-success-box]');
  const summary = document.querySelector('[data-form-summary]');
  if(!form || !box || !summary) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const required = ['owner_name','phone','email','timezone','pet_name','pet_type','pet_age'];
    const missing = required.filter(name => !String(data.get(name) || '').trim());
    if(missing.length){
      alert('Please complete all required form fields before submitting the prototype form.');
      return;
    }
    summary.innerHTML = `Request prepared for <strong>${data.get('owner_name')}</strong> about <strong>${data.get('pet_name')}</strong> (${data.get('pet_type')}, ${data.get('pet_age')}). A confirmation would be sent to <strong>${data.get('email')}</strong> and follow-up would be scheduled for the <strong>${data.get('timezone')}</strong> time zone.`;
    box.classList.add('show');
    form.scrollIntoView({behavior:'smooth', block:'start'});
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupConsultForm();
});
