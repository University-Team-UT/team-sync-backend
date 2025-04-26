export const TASK_ROUTES = {
	INDEX: 'task',
	CREATE_TASK: 'create-task',
	SET_EXECUTOR: 'set-executor/:taskId',
	MOVE_POSITION: 'move-position/:taskId',
	SET_DEADLINE: 'set-deadline/:taskId',
	SET_PRIORITY: 'set-priority/:taskId',
	CHANGE_STATUS: 'change-status/:taskId',
	SET_TAG: 'set-tag/:taskId',
	REMOVE_TAG: 'remove-tag/:taskId',
	DELETE_TASK: 'delete-task/:taskId',
	GET_TASKS_BY_WORKBENCH_ID: 'get-tasks-by-workbench-id/:workbenchId',
	GET_TASKS_BY_EXECUTOR_ID: 'get-tasks-by-executor-id/:executorId',

	CREATE_SUBTASK: 'add-subtask',
	UPDATE_SUBTASK: 'update-subtask/:subtaskId',
	DELETE_SUBTASK: 'remove-subtask/:subtaskId'
}
