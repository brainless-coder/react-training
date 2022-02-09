import { Card, CardBody,  CardImg, CardTitle} from "reactstrap";

const ProjectCard = (props) => {
  const { imgAltText, firstName, lastName, imgSrcUrl } = props;

  return (
    <Card  style={{ width: '16rem', textAlign: 'center'}} className="bg-dark text-white">
      <CardImg
        alt={imgAltText}
        src={imgSrcUrl}
        top
      />
      <CardBody>
        <CardTitle tag="h3">{`${firstName} ${lastName}`}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
