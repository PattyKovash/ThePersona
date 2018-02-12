const { expect } = chai;

describe('App Component', function () {
  let element, scope;

  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module('templates'));
  beforeEach(angular.mock.module(($provide) => {
    $provide.value('$state', {});
  }));
  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    element = angular.element('<app></app>');
    element = $compile(element)(scope);
    $rootScope.$digest();
  }));

  it('should render', () => {
    expect(element.find('app').length).to.exist;
  });

  it('should have a controller', () => {
    expect(element.isolateScope().$ctrl).to.exist;
  });
});
