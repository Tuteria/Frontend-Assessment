exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: "Note 1", description: 'This is Note 1', owner: "jack"},
        {title: "Note 2", description: 'This is Note 2', owner: "jack"},
        {title: "Note 3", description: 'This is Note 3', owner: "james"},
        {title: "Note 4", description: 'This is Note 4', owner: "james"},
      ]);
    });
};
