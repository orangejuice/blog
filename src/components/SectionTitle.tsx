import styled from '@emotion/styled'

const SectionTitle = styled.div`
  font-size: ${props => props.theme.fontSize};
  text-transform: uppercase;
  font-weight: bold;
  //text-align: center;
  color: ${props => props.theme.colors.grey};
  position: relative;
  padding-bottom: 1rem;
  margin-top: 2rem;

  &:after {
    content: '';
    height: 1px;
    width: 50px;
    position: absolute;
    bottom: 0;
    left: 0%;
    //margin-left: -25px;
    background: ${props => props.theme.colors.secondary};
  }
`;

export default SectionTitle;
