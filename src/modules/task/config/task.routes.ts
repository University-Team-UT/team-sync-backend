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

	CREATE_SUBTASK: 'add-subtask',
	UPDATE_SUBTASK: 'update-subtask/:subtaskId',
	DELETE_SUBTASK: 'remove-subtask/:subtaskId'
}
