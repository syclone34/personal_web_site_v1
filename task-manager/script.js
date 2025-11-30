// Task Manager Application
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.initializeElements();
        this.attachEventListeners();
        this.renderTasks();
    }

    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.taskPriority = document.getElementById('taskPriority');
        this.taskDueDate = document.getElementById('taskDueDate');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.taskLists = document.querySelectorAll('.task-list');
        this.emptyState = document.getElementById('emptyState');
    }

    attachEventListeners() {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter tasks
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTasks();
            });
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Drag and drop
        this.taskLists.forEach(list => {
            list.addEventListener('dragover', (e) => this.handleDragOver(e));
            list.addEventListener('drop', (e) => this.handleDrop(e));
            list.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            list.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.taskInput.focus();
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            priority: this.taskPriority.value,
            dueDate: this.taskDueDate.value || null,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();

        // Reset inputs
        this.taskInput.value = '';
        this.taskDueDate.value = '';
        this.taskInput.focus();

        // Animation
        this.showNotification('Task added successfully!');
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
        this.showNotification('Task deleted');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    updateTaskPriority(id, newPriority) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.priority = newPriority;
            this.saveTasks();
            this.renderTasks();
            this.showNotification(`Task moved to ${newPriority} priority`);
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.renderTasks();
            this.showNotification(`${completedCount} task(s) cleared`);
        }
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        // Clear all lists
        this.taskLists.forEach(list => {
            list.innerHTML = '';
        });

        const filteredTasks = this.getFilteredTasks();

        // Show/hide empty state
        if (this.tasks.length === 0) {
            this.emptyState.classList.add('show');
        } else {
            this.emptyState.classList.remove('show');
        }

        // Render tasks by priority
        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            const listId = `${task.priority}PriorityList`;
            const list = document.getElementById(listId);
            if (list) {
                list.appendChild(taskElement);
            }
        });

        // Update counts
        this.updateCounts();
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
        div.draggable = true;
        div.dataset.id = task.id;

        // Check if overdue
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

        div.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <div class="task-actions">
                    <button class="task-btn delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${task.dueDate ? `
                <div class="task-meta">
                    <div class="task-due-date ${isOverdue ? 'overdue' : ''}">
                        <i class="fas fa-calendar"></i>
                        <span>${this.formatDate(task.dueDate)}</span>
                        ${isOverdue ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                    </div>
                </div>
            ` : ''}
        `;

        // Event listeners
        const checkbox = div.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => this.toggleTask(task.id));

        const deleteBtn = div.querySelector('.delete');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        // Drag events
        div.addEventListener('dragstart', (e) => this.handleDragStart(e));
        div.addEventListener('dragend', (e) => this.handleDragEnd(e));

        return div;
    }

    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    handleDragEnter(e) {
        if (e.target.classList.contains('task-list')) {
            e.target.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        if (e.target.classList.contains('task-list')) {
            e.target.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const taskList = e.target.closest('.task-list');
        if (!taskList) return;

        taskList.classList.remove('drag-over');

        const taskId = parseInt(e.dataTransfer.getData('text/plain'));
        const newPriority = taskList.dataset.priority;

        this.updateTaskPriority(taskId, newPriority);
    }

    updateCounts() {
        const all = this.tasks.length;
        const active = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('count-all').textContent = all;
        document.getElementById('count-active').textContent = active;
        document.getElementById('count-completed').textContent = completed;

        // Update priority counts
        ['high', 'medium', 'low'].forEach(priority => {
            const count = this.tasks.filter(t => 
                t.priority === priority && 
                (this.currentFilter === 'all' || 
                 (this.currentFilter === 'active' && !t.completed) ||
                 (this.currentFilter === 'completed' && t.completed))
            ).length;
            const section = document.querySelector(`[data-priority="${priority}"]`);
            const counter = section.querySelector('.task-count');
            if (counter) counter.textContent = count;
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Reset time for comparison
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);

        if (compareDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (compareDate.getTime() === tomorrow.getTime()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message) {
        // Simple notification (you can enhance this with a toast library)
        console.log(message);
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
