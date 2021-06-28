import { useState, useEffect } from "react";
import { Pagination, Container, Row, Col, Card, Button } from "react-bootstrap";
import logo from './../images/sample.jpeg';
import '../App.css';

const PaginationComp = (props) => {
    const [dataList, setDataList] = useState([]);
    const [pageCount, setPageCount] = useState();
    const [active, setActive] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    useEffect(async () => {
        try {
            const data = await fetch("https://jsonplaceholder.typicode.com/posts");
            // console.log(data.status)
            if (data.status === 200) {
                const responseData = await data.json()
                setDataList(responseData);
                setPageCount(Math.ceil(responseData.length / 10))
                // console.log(responseData)
            }
            else {
                alert("something wrong")
            }
        }
        catch (e) {
            alert(e)
        }
    },
        []);
    const indexOfLastPost = active * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (index) => {
        setActive(index)
        // console.log(index)
    }

    let items = [];
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => changePage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <>
            <Container>
                <Row style={{ margin: "20px" }}>
                    {currentPosts.map((data, index) => <Col md={6}>
                        <Card style={{ margin: "10px" }}>
                            <Card.Img variant="top" src={logo} />
                            <Card.Body>
                                <Card.Title style={{ color: "black" }}>{data.title}</Card.Title>
                                <Card.Text style={{ color: "black" }}>{data.body}</Card.Text>
                                <Button variant="primary">ReadMore</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    )}
                </Row>
            </Container>
            <Pagination size="lg">{items}</Pagination>
        </>
    )
}

export default PaginationComp;
