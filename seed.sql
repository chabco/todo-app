insert into users
    (displayname, username)
values
    ('epoy', 'Duterte230'),
    ('alfed', 'theButler');

select * from users;



insert into todos
    (priority, task, user_id)
values
    (1, 'feed the cat', 1),
    (2, 'bathe the chicken', 1),
    (3, 'sleep for 16 hours', 1),
    (99, 'eat an entire cow', 1),
    (1, 'feed the bat', 2),
    (2, 'clean the cave', 2),
    (3, 'rule the world', 2);

select * from todos;