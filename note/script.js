const database = firebase.database();

let currentEditKey = null;
let deleteKey = null;
let deleteRow = null;

const websiteTableBody = document.getElementById('websiteTableBody');
let rowNumber = 0;

function addWebsite() {
  const urlInput = document.getElementById('url');
  const url = urlInput.value.trim();
  if (!url) {
    alert('URL is required!');
    return;
  }

  database.ref('notepad1').push({ url })
    .then(() => {
      urlInput.value = '';
      showNotification('Website added successfully!', 'success');
    })
    .catch(() => showNotification('Error adding website!', 'danger'));
}

function editUrl(key, website) {
  currentEditKey = key;
  document.getElementById('editUrl').value = website.url;
  $('#editModal').modal('show');
}

document.getElementById('saveEditButton').addEventListener('click', () => {
  const url = document.getElementById('editUrl').value;
  if (url) {
    database.ref('/notepad1/' + currentEditKey).update({ url })
      .then(() => {
        $('#editModal').modal('hide');
        showNotification('Website updated successfully!', 'success');
      })
      .catch(() => showNotification('Error updating website!', 'danger'));
  } else {
    showNotification('URL is required!', 'warning');
  }
});

function deleteUrl(key, row) {
  deleteKey = key;
  deleteRow = row;
  $('#deleteModal').modal('show');
}

document.getElementById('confirmDelete').addEventListener('click', () => {
  if (deleteKey) {
    database.ref(`/notepad1/${deleteKey}`).remove()
      .then(() => {
        if (deleteRow) deleteRow.remove();
        showNotification('Website deleted successfully!', 'success');
        $('#deleteModal').modal('hide');
      })
      .catch(() => showNotification('Error deleting website!', 'danger'));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && $('#deleteModal').hasClass('show') &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    document.getElementById("confirmDelete").click();
  }
});

database.ref('/notepad1').on('child_added', (snapshot) => {
  const website = snapshot.val();
  const newRow = createTableRow(snapshot.key, website);
  websiteTableBody.prepend(newRow);
});

function createTableRow(key, website) {
  const newRow = document.createElement('tr');
  const cellNumber = document.createElement('td');
  const cellActions = document.createElement('td');
  const cellUrl = document.createElement('td');

  cellNumber.textContent = ++rowNumber;
  cellUrl.innerHTML = `
    <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
      ${website.url}
    </p>`;

  const actions = [
    { icon: 'fas fa-edit', tooltip: 'Edit', action: () => editUrl(key, website) },
    { icon: 'fas fa-trash', tooltip: 'Delete', action: () => deleteUrl(key, newRow) },
    { icon: 'fas fa-copy', tooltip: 'Copy', action: () => copyToClipboard(website.url) },
    { icon: 'fas fa-external-link-alt', tooltip: 'Open in new tab', action: () => window.open(website.url, '_blank') },
    { icon: 'fas fa-eye', tooltip: 'Open in iframe', action: () => openInIframe(website.url) }
  ];

  actions.forEach(({ icon, tooltip, action }) => {
    const button = createIconButton(icon, tooltip, action);
    cellActions.appendChild(button);
  });

  cellActions.style.display = 'flex';
  newRow.append(cellNumber, cellActions, cellUrl);
  return newRow;
}

function openInIframe(url) {
  const contentIframe = document.getElementById('contentIframe');
  if (contentIframe) {
    contentIframe.src = url;
    $('#iframeModal').modal({ backdrop: 'static', keyboard: false });
    $('#iframeModal').modal('show');
  } else {
    alert('Iframe element not found!');
  }
}

$('#iframeModal').on('hidden.bs.modal', () => {
  const contentIframe = document.getElementById('contentIframe');
  if (contentIframe) {
    contentIframe.src = '';
  }
});

function createIconButton(iconClass, tooltip, onClick) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-sm', 'btn-light', 'mx-1');
  button.setAttribute('title', tooltip);
  button.innerHTML = `<i class="${iconClass}"></i>`;
  button.addEventListener('click', onClick);
  return button;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showNotification('URL copied to clipboard!', 'success'))
    .catch(() => showNotification('Failed to copy URL!', 'danger'));
}

function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => notification.innerHTML = '', 3000);
}
