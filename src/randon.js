const fs = require('fs');

const getRandonJson = () => {
  const faker = require('faker');
  const _ = require('underscore');

  const NUMBER_PARTNERS = 120;
  const segments = [
    'Bebidas',
    'Restaurantes',
    'Padarias',
    'Pets',
    'Farmacias',
    'Assistência técnica',
    'Supermercados',
    'Pizzas',
    'Hamburgers',
    'Roupas',
  ];

  faker.locale = 'pt_BR';

  const data = {
    segments: [],
    partners: [],
  };

  data.segments = segments.map((name, index) => ({
    id: index + 1,
    name,
    image: {
      uri: `http://loremflickr.com/g/320/200/${name}`,
    },
  }));

  const getRandonSegments = (count) => {
    const randonSegments = _.sample(data.segments, count);

    return {
      ids: randonSegments.map(item => item.id),
      names: randonSegments.map(item => item.name),
    };
  };

  const generateRandonPosts = (count, subject) => {
    const posts = [];

    for (let index = 0; index < count; index++) {
      posts.push({
        image: {
          uri: `http://loremflickr.com/g/320/200/${subject}`,
        },
        created_at: faker.date.recent(7),
      });
    }

    return posts;
  };

  for (let index = 0; index < NUMBER_PARTNERS; index++) {
    const randonSegments = getRandonSegments(_.random(1, 5));
    const mainSegmentName = randonSegments.names[0];

    data.partners.push({
      id: index,
      name: faker.company.companyName(),
      subtitle: faker.company.catchPhrase(),
      segments: randonSegments.ids,
      logo: {
        uri: `http://loremflickr.com/g/70/70/${mainSegmentName}`,
      },
      latest_posts: generateRandonPosts(_.random(1, 3), mainSegmentName),
    });
  }

  return data;
};

module.exports = () => getRandonJson();
