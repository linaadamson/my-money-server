class Container {
  constructor() {
    this.dependencies = {};
  }

  register(name, dependency) {
    this.dependencies[name] = dependency;
  }

  resolve(dependencyNames) {
    const resolvedDependencies = {};

    dependencyNames.forEach((name) => {
      if (!this.dependencies[name]) {
        throw new Error(`Dependency not found: ${name}`);
      }

      if (!resolvedDependencies[name]) {
        resolvedDependencies[name] = this.resolve(
          Object.keys(this.dependencies[name])
        );
        resolvedDependencies[name] = this.dependencies[name](
          resolvedDependencies[name]
        );
      }
    });

    return resolvedDependencies;
  }
}

module.exports = new Container();

// class Container {
//   constructor() {
//     this.dependencies = {};
//   }

//   register(name, dependency) {
//     this.dependencies[name] = dependency;
//   }

//   get(name) {
//     if (!this.dependencies[name]) {
//       throw new Error(`Dependency not found: ${name}`);
//     }
//     return this.dependencies[name];
//   }
// }
