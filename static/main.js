function editar_tarea(id, contenido) {
Swal.fire({
  title: "Editar tarea",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
    placeholder: contenido
  },
  confirmButtonText: "Editar",
  showLoaderOnConfirm: true,
  preConfirm: async (cnt) => {
    if (cnt === contenido) {
        Swal.showValidationMessage(`
            "La tarea debe ser distinta."
        `);
    }
    if (cnt == "") {
        Swal.showValidationMessage(`
            "Debes reescribir la tarea."
        `);
    }
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
  console.log(result)
        const datos = {
            contenido: result.value
        };
        const url = `editar-tarea/${id}`;
        function redirectToUrl(url, data) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = url;
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = data[key];
                    form.appendChild(input);
                }
            }
            document.body.appendChild(form);
            form.submit();
        }
        redirectToUrl(url, datos);
  }
});
}