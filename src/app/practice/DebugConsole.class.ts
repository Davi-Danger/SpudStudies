export class DebugConsole {
  enabled: boolean;
  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  log(input = 'No console input given!') {
    if (this.enabled) {
      console.log(input);
    }
  }
}
