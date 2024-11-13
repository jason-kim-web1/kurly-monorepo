const { execSync } = require('child_process');

const checkStagedFilesWithPrettier = (files) => {
  if (!files || files.length === 0) {
    console.log('변경사항이 없습니다.');
    process.exitCode = 2;
  }
  try {
    execSync(`prettier --check ${stagedFiles.join(' ')}`);
  } catch (error) {
    if (error.status !== 0) {
      console.log('코드 형식을 확인해 주세요!');
      process.exitCode = 2;
    }
  }
};

const stagedFiles = process.argv.slice(2);
checkStagedFilesWithPrettier(stagedFiles);
