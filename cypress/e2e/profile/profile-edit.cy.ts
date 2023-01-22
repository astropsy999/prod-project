let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('и профиль успешно загружается', () => {
    cy.getByTestID('ProfileCard.firstname').should('have.value', 'User');
  });
  it('и редактирует его', () => {
    const newName = 'NewName';
    const newLastname = 'NewLastname';
    cy.updateProfile(newName, newLastname);
    cy.getByTestID('ProfileCard.firstname').should('have.value', newName);
    cy.getByTestID('ProfileCard.lastname').should('have.value', newLastname);
  });
});
