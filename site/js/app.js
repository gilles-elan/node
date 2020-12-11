let div = document.querySelector('.stagiaires ul')

const stagiaires = async () => {
  const result = await fetch('http://localhost:5000/api/stagiaires', { method: 'get' })
  const data = await result.json()
  data.forEach((stagiaire, index) => {
    div.innerHTML += `<li>
            <p>nom: ${stagiaire.name}</p>
            <p>adresse email: ${stagiaire.email}</p>
            <p>Groupe: ${stagiaire.group}</p>
            <p>Age: ${stagiaire.age} ans</p>
            <p>Date de création: ${stagiaire.date}</p>
            <button data-email="${stagiaire.email}" class="supprimer">Supprimer</button>
        </li>`
  })
}

stagiaires()
  .then(() => {
    const supprimer = document.querySelectorAll('.supprimer')
    console.log(supprimer)
    for (let sup of supprimer) {
      sup.addEventListener('click', function () {
        let email = this.dataset.email
        fetch('http://localhost:5000/api/stagiaires', {
          method: 'delete',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        }).then(result => console.log(result.json()))
      })
    }
  })
