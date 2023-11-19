import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Spacer,
  Textarea,
} from "@chakra-ui/react";

const CreateTicket: React.FC = () => {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, status };
      await fetch(`/api/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select status"
            >
              <option value="new">New</option>
              <option value="inprogress">In Progress</option>
              <option value="resolved">Resolved</option>
            </Select>

            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              value={title}
            />

            <FormLabel>Content</FormLabel>
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                size="sm"
              />
          </FormControl>
          <HStack>
            <Button
              colorScheme="purple"
              disabled={!content || !title || !status}
              type="submit"
            >
              Create
            </Button>
            <Spacer />
            <Button alignContent={"center"} onClick={() => Router.push("/")}>
              Cancel
            </Button>
          </HStack>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTicket;
