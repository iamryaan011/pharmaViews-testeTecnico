const editModal = document.querySelector("#editModalForm");

const clearFieldsButton = () => {
  document.querySelector('select[name="acao"]').value =
    "Selecione o tipo de ação";
  document.querySelector('input[name="data"]').value = "";
  document.querySelector('input[name="investimento"]').value = "";

  event.preventDefault();
};

//delete
const deleteItem = (id) => {
  fetch(`../../../backend/configs/processData.php?delete=true&id=${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        loadItems();
      } else {
        alert("Erro ao excluir o item.");
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir:", error);
    });
};

//close Modal
const closeModal = () => {
  editModal.style.display = "none";
};

//edit && open Modal
const editItem = (id) => {
  fetch(`../../../backend/configs/processData.php?getItem=true&id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('select[name="acao-edit"]').value =
        "Selecione o tipo de ação";
      document.querySelector('input[name="data-edit"]').value =
        data.data_prevista;
      document.querySelector('input[name="investimento-edit"]').value =
        data.investimento_previsto;
      document.querySelector('input[name="id-edit"]').value = data.id;
      editModal.style.display = "flex";
    })
    .catch((error) => console.error("Erro ao buscar dados:", error));
};

document.querySelector("#editModalForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.querySelector('input[name="id-edit"]').value;
  const acao = document.querySelector('select[name="acao-edit"]').value;
  const data = document.querySelector('input[name="data-edit"]').value;
  const investimento = document.querySelector(
    'input[name="investimento-edit"]'
  ).value;

  fetch(`../../../backend/configs/processData.php`, {
    method: "POST",
    body: new URLSearchParams({
      edit: true,
      id: id,
      acao: acao,
      data: data,
      investimento: investimento,
    }),
  })
    .then((response) => {
      if (response.ok) {
        loadItems();
        closeModal();
      } else {
        alert("Erro ao editar item.");
      }
    })
    .catch((error) => console.error("Erro ao editar:", error));
});

//read
const loadItems = () => {
  fetch("../../../backend/configs/read.php")
    .then((response) => {
      if (!response.ok) {
        throw new Errow("Erro na resposta da API.");
      }

      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#tbodyTableValues");

      const htmlContent = data
        .map((value) => {
          const data = new Date(value["data-prevista"].replace(/-/g, "/"));
          data.setDate(data.getDate());
          const dataFormatada = data.toLocaleDateString("pt-BR");

          const investimentoFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value["investimento-previsto"]);

          return `
          <tr class="tableValues" id="row-${value["id"]}">
            <td>${value["ação"]}</td>
            <td>${dataFormatada}</td>
            <td>${investimentoFormatado}</td>
            <td style="text-align: center">
              <img src="../../public/images/edit-icon.png" alt="edit" onclick="editItem(${value["id"]})" />
            </td>
            <td style="text-align: center">
              <img src="../../public/images/delete-icon.png" onclick="deleteItem(${value["id"]})"/>
            </td>
          </tr>
        `;
        })
        .join("");

      tbody.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.log("Erro ao consumir a API! " + error);
    });
};

window.onload = function () {
  loadItems();
};
