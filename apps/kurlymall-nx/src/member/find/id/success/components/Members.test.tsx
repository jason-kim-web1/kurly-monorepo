import { render } from '@testing-library/react';

import Members from './Members';

describe('Members', () => {
  const members = [
    {
      memberId: 'gildong',
      status: 'ACTIVE',
      joinedAt: '2021.05.11',
    },
  ];

  const renderMembers = () => render(<Members members={members} />);

  it('renders Members', () => {
    const { container } = renderMembers();

    expect(container).toHaveTextContent(members[0].memberId);
    expect(container).toHaveTextContent(members[0].joinedAt);
  });
});
