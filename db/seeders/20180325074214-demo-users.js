'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'test@test.com',
      username: 'test',
      password: '123456',
      first_name: 'Tester',
      last_name: 'Testerov',
      profile_pic: 'http://rossmillfarm.com/rossmill3/wp-content/uploads/2017/03/Testing.jpg',
      cover_pic: 'http://covertimeline.com/app/template/1035.jpg',
      description: 'Test profile description here.',
      age: 24,
    }, {
      email: 'john@test.com',
      username: 'john',
      password: '123456',
      first_name: 'John',
      last_name: 'Cena',
      profile_pic: 'http://i0.kym-cdn.com/entries/icons/original/000/018/826/John_Cena.png',
      cover_pic: 'http://covertimeline.com/app/template/1035.jpg',
      description: 'Test profile description here.',
      age: 30,
    }, {
      email: 'nikola@mail.tld',
      username: 'nikola_tesla',
      password: '123456',
      first_name: 'Nikola',
      last_name: 'Tesla',
      profile_pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/1200px-N.Tesla.JPG',
      cover_pic: 'http://covertimeline.com/app/template/1035.jpg',
      description: 'inventor, electrical engineer, mechanical engineer, physicist, and futurist who is best known for his contributions to the design of the modern alternating current (AC) electricity supply system',
      age: 87,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
