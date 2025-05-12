import React, { useState } from 'react';
const tasks = [
    { id: 1, title: 'Kupić piwo na wieczór', completed: true },
    { id: 2, title: 'Znaleźć otwieracz do butelek', completed: false },
    { id: 3, title: 'Ustawić playlistę do picia', completed: true },
    { id: 4, title: 'Zadzwonić po kumpla od wódki', completed: false },
    { id: 5, title: 'Zamówić kebaba przed 2:00', completed: true },
    { id: 6, title: 'Nie dzwonić do ex po 3 drinkach', completed: false },
    { id: 7, title: 'Zrobić zapas elektrolitów na rano', completed: true },
    { id: 8, title: 'Powiedzieć „to ostatni kieliszek” (i dotrzymać)', completed: true },
];
function TaskList() {
    const [filter, setFilter] = useState('all');
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return filter === 'completed' ? task.completed :
            !task.completed;
    });
    return (
        <div>
            <select onChange={e => setFilter(e.target.value)}>
                <option value="all">Wszystkie</option>
                <option value="completed">Ukończone</option>
                <option
                    value="incomplete">Nieukończone</option>
            </select>
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        {task.title} {task.completed ? '✔' : '✖'}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TaskList;