// GLOBAL VARIABLES DEFINITIONS TO GET DOM ELEMENTS
const modal = document.getElementById('modal');
const intents = document.getElementById('intents');

const intentTitleWrapper = document.getElementById('intentTitleWrapper');
const intentExpressionsWrapper = document.getElementById(
  'intentExpressionsWrapper'
);
const intentAnswerWrapper = document.getElementById('intentAnswerWrapper');

const modalFooter = document.getElementById('modalFooter');
const cancelBtn = document.getElementById('cancelBtn');
const createBtn = document.getElementById('createBtn');

// ***** GENERAL METHODS TO SET DOM NODES ***** //
// Set attribute node constructor
const setAttributes = (elt, options) => {
  Object.keys(options).forEach(attr => elt.setAttribute(attr, options[attr]));
};

// Single node constructor
const nodeConstructor = (nodeType, className, idName, roleName, content) => {
  const newNode = document.createElement(nodeType);
  setAttributes(newNode, { class: className, id: idName, role: roleName });
  content && (newNode.textContent = content);
  return newNode;
};
// ***** END  ***** DOM METHODS  ***** //

// ***** DOM ELEMENTS DYNAMIC CREATION ***** //
// Construction of the modal fields (inputs)
const createModalFields = (titleValue, expressionsValue, answerValue) => {
  intentTitleWrapper.innerHTML = '';
  intentExpressionsWrapper.innerHTML = '';
  intentAnswerWrapper.innerHTML = '';
  modalFooter.classList.add('modalFooter--show');
  createBtn.textContent = 'Create';

  const intentTitle = document.createElement('input');
  setAttributes(intentTitle, {
    id: 'intentTitle',
    class: 'input',
    type: 'text',
    name: 'title',
    'aria-required': true,
    placeholder: 'Where is Bryan ?',
    value: titleValue
  });

  const intentExpressions = document.createElement('textarea');
  setAttributes(intentExpressions, {
    id: 'intentExpressions',
    class: 'input',
    type: 'textarea',
    name: 'expressions',
    'aria-required': true,
    placeholder: 'One on each line',
    value: expressionsValue,
    rows: '8'
  });
  intentExpressions.textContent = expressionsValue;

  const intentAnswer = document.createElement('input');
  setAttributes(intentAnswer, {
    id: 'intentAnswer',
    class: 'input',
    type: 'text',
    name: 'answer',
    'aria-required': true,
    placeholder: 'In the kitchen !',
    value: answerValue
  });
  intentTitleWrapper.appendChild(intentTitle);
  intentExpressionsWrapper.appendChild(intentExpressions);
  intentAnswerWrapper.appendChild(intentAnswer);
};

// Construction of a complete new intent
let i = 0;
const createNewIntent = intent => {
  const newIntentTitle = nodeConstructor(
    'p',
    'new-intent__title',
    `newIntentTitle${i}`,
    'link',
    intent.title
  );
  const newIntentExpressions = nodeConstructor(
    'p',
    'new-intent__data',
    '',
    '',
    intent.expressions
  );
  const newIntentAnswer = nodeConstructor(
    'p',
    'new-intent__data',
    '',
    '',
    intent.answer
  );

  const newIntentUpdate = nodeConstructor(
    'p',
    'new-intent__update',
    '',
    'info',
    'Last update'
  );
  const newIntentTimer = nodeConstructor(
    'p',
    'new-intent__timer',
    '',
    'info',
    'seconds ago'
  );

  const newIntentInfos = nodeConstructor('div', 'new-intent__infos', '', '');
  newIntentInfos.appendChild(newIntentUpdate);
  newIntentInfos.appendChild(newIntentTimer);

  const newIntentEdit = nodeConstructor(
    'i',
    'fas fa-pen',
    `newIntentEdit${i}`,
    'button'
  );
  const newIntentDelete = nodeConstructor(
    'i',
    'fas fa-trash',
    `newIntentDelete${i}`,
    'button'
  );

  const newIntentButtons = nodeConstructor(
    'div',
    'new-intent__buttons',
    '',
    'links'
  );
  newIntentButtons.appendChild(newIntentEdit);
  newIntentButtons.appendChild(newIntentDelete);

  const newIntentContent = nodeConstructor(
    'div',
    'new-intent__content',
    '',
    'content'
  );
  newIntentContent.appendChild(newIntentInfos);
  newIntentContent.appendChild(newIntentButtons);

  const newIntent = nodeConstructor('div', 'new-intent', `newIntent${i}`, '');
  newIntent.appendChild(newIntentTitle);
  newIntent.appendChild(newIntentExpressions);
  newIntent.appendChild(newIntentAnswer);
  newIntent.appendChild(newIntentContent);
  i++;
  return newIntent;
};

// Contruction of the confirmation deletion message
const createDeletionMessage = newIntent => {
  const yesBtn = nodeConstructor(
    'button',
    'modal__cancel-button',
    'yesBtn',
    'button',
    'Yes I am'
  );
  const noBtn = nodeConstructor(
    'button',
    'modal__create-button',
    'noBtn',
    'button',
    "No I'm not"
  );
  const buttonsContainer = nodeConstructor(
    'div',
    'modal__footer modalFooter--show',
    'buttonsContainer',
    'links'
  );
  buttonsContainer.appendChild(yesBtn);
  buttonsContainer.appendChild(noBtn);
  newIntent.appendChild(buttonsContainer);
  return newIntent;
};
// ***** END **** DOM ELEMENTS CREATION ***** //

// ***** DISPLAYING METHODS ***** //
// Displays the modal
const toggleModal = () => {
  modal.classList.toggle('modal--show');

  const modalContent = document.getElementsByClassName('modal__content');
  const inputs = document.getElementsByClassName('input');
  modalContent[0].addEventListener('keyup', e => {
    let inactive = false;
    for (const input of inputs) {
      if (input.value === '') {
        inactive = true;
      }
    }
    if (inactive) {
      createBtn.classList.add('modal--inactive-btn');
    } else {
      createBtn.classList.remove('modal--inactive-btn');
    }
  });
};

// Displays the confirmation toaster message
const showToast = actionVerb => {
  const toast = document.getElementById('toast');
  toast.innerHTML = `You successfully ${actionVerb} your intent!`;
  toast.classList.toggle('toast--show');
  setTimeout(() => {
    toast.classtitle = toast.classList.toggle('toast--show');
  }, 3000);
};

// Handles the new links creation
const handleCreateIntent = () => {
  const intentTitle = document.getElementById('intentTitle');
  const intentExpressions = document.getElementById('intentExpressions');
  const intentAnswer = document.getElementById('intentAnswer');
  const intent = {
    title: intentTitle.value,
    expressions: intentExpressions.value,
    answer: intentAnswer.value
  };
  if (intent.title && intent.answer && intent.expressions) {
    toggleModal();
    showToast('added');
    const newIntent = createNewIntent(intent);
    intents.insertBefore(newIntent, addIntent);
  } else {
    alert('Please fill each field');
  }
};
// ***** END ***** DISPLAYING METHODS  ***** //

//*************** EVENTS HANDLERS **************//
//Calls the modal form on click on the initial intent button
const addIntent = document.getElementById('addIntent');
addIntent.addEventListener('click', () => {
  createModalFields('', '', '');
  toggleModal();
});
const closeBtnModal = document.getElementById('closeBtnModal');
closeBtnModal.addEventListener('click', toggleModal);

// Modal buttons onclic cancel & create buttons
cancelBtn.addEventListener('click', toggleModal);

createBtn.addEventListener('click', e => {
  createBtn.textContent === 'Create' && handleCreateIntent();
});

// Displays the data fullfilled on click on a new intent's title
intents.addEventListener('click', e => {
  // Reset the style of labels
  const labels = document.getElementsByTagName('label');
  for (const label of labels) {
    label.classList.remove('modal--data-label');
  }

  if (e.target && e.target.classList[0] === 'new-intent__title') {
    toggleModal();

    for (const label of labels) {
      label.classList.add('modal--data-label');
    }

    intentTitleWrapper.innerHTML = `${e.target.textContent}`;
    intentAnswerWrapper.innerHTML = `${e.target.nextSibling.nextSibling.textContent}`;
    const expressions = e.target.nextSibling.textContent.split('\n');
    intentExpressionsWrapper.innerHTML = '';
    for (const expression of expressions) {
      const expressionParagraph = nodeConstructor(
        'p',
        'expression',
        '',
        '',
        expression
      );
      intentExpressionsWrapper.appendChild(expressionParagraph);
    }

    modalFooter.classList.remove('modalFooter--show');
  }
});

//Handle delete button
intents.addEventListener('click', e => {
  if (e.target && e.target.classList[1] === 'fa-trash') {
    const newIntentClickedId = e.target.parentNode.parentNode.parentNode.id;
    const newIntentClicked = document.getElementById(newIntentClickedId);
    const newIntentTitle = newIntentClicked.firstChild.textContent;
    newIntentClicked.firstChild.textContent =
      'You are about to delete this intent. Are you sure?';
    const intentContent = e.target.parentNode.parentNode;
    intentContent.style.display = 'none';

    newIntentClicked.classList.add('new-intent--deletion-message');

    createDeletionMessage(newIntentClicked);

    yesBtn.addEventListener('click', e => {
      newIntentClicked.innerHTML = '';
      newIntentClicked.remove();
      showToast('deleted');
    });
    noBtn.addEventListener('click', e => {
      newIntentClicked.firstChild.textContent = newIntentTitle;
      buttonsContainer.innerHTML = '';
      buttonsContainer.remove();
      intentContent.style.display = 'flex';
      newIntentClicked.classList.remove('new-intent--deletion-message');
    });
  }
});

// Handle edit button
intents.addEventListener('click', e => {
  if (e.target && e.target.classList[1] === 'fa-pen') {
    const newIntentClickedId = e.target.parentNode.parentNode.parentNode.id;
    let newIntentClicked = document.getElementById(newIntentClickedId);

    createModalFields(
      newIntentClicked.firstChild.textContent,
      newIntentClicked.firstChild.nextSibling.textContent,
      newIntentClicked.firstChild.nextSibling.nextSibling.textContent
    );
    toggleModal();
    createBtn.textContent = 'Edit';

    createBtn.addEventListener('click', e => {
      if (e.target && e.target.textContent === 'Edit') {
        const intentTitle = document.getElementById('intentTitle');
        const intentExpressions = document.getElementById('intentExpressions');
        const intentAnswer = document.getElementById('intentAnswer');
        newIntentClicked.firstChild.textContent = intentTitle.value;
        newIntentClicked.firstChild.nextSibling.textContent =
          intentExpressions.value;
        newIntentClicked.firstChild.nextSibling.nextSibling.textContent =
          intentAnswer.value;
        toggleModal();
        showToast('edited');
      }
      newIntentClicked = '';
      e.target.textContent = 'Create';
    });
  }
});
// ***** END **** EVENT HANDLERS **** //
