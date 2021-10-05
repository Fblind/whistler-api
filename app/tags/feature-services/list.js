module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

function _execute({ TagRepo }) {
  return async () => {
    return await TagRepo.list();
  };
}
