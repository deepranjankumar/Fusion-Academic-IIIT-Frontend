import { useState, useEffect } from 'react';
import { TextInput, Textarea, Button, Group, Container, Paper, Title, NumberInput, Grid, FileInput } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useSelector } from "react-redux";

export default function MastersForm() {
  const roll_no = useSelector((state) => state.user.roll_no);
  const [formData, setFormData] = useState({
    theme: 'Sample Topic', // Default topic
    seminarDate: null,
    time: '',
    place: '',
    previousWork: '',
    contribution: '',
    futurePlan: '',
    numPublications: '',
    numPublished: '',
    numPresented: '',
    numSubmitted: '',
    pdfFile: null,
  });

  const [isEditingTheme, setIsEditingTheme] = useState(false); // Controls edit mode for theme

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch(`http://localhost:8000/applications/academic_procedure/api/work-details/${roll_no}/`);
        if (response.ok) {
          const data = await response.json();
          console.log('Theme:', data.data.theme);
          setFormData((prev) => ({ ...prev, theme:data.data.theme || 'Sample Topic' }));
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };

    fetchTheme();
  }, [roll_no]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:8000/applications/academic_procedure/api/seminar-report/${roll_no}/`;
    const submissionData = {
      roll_no,
      theme: formData.theme,
      seminar_date: formData.seminarDate ? formData.seminarDate.toISOString().split("T")[0] : null,
      seminar_time: formData.time,
      place: formData.place,
      work_done: formData.previousWork,
      specific_contribution: formData.contribution,
      future_plan: formData.futurePlan,
      publications_count: formData.numPublications,
      papers_published: formData.numPublished,
      papers_presented: formData.numPresented,
      papers_submitted: formData.numSubmitted,
    };

    try {
      const formDataObj = new FormData();
      formDataObj.append("data", JSON.stringify(submissionData));
      if (formData.pdfFile) {
        formDataObj.append("pdf", formData.pdfFile);
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting");
    }
  };

  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" withBorder>
        <Title align="center" mb="lg">Seminar Report</Title>

        {/* Editable Theme of Masters’ Work */}
        <Group position="apart" mb="sm">
          <Title order={5}>Theme of Masters’ Work</Title>
          <Button size="xs" variant="outline" onClick={() => setIsEditingTheme(!isEditingTheme)}>
            {isEditingTheme ? 'Save' : 'Edit'}
          </Button>
        </Group>
        
        {isEditingTheme ? (
          <Textarea
            autosize
            minRows={2}
            required
            value={formData.theme}
            onChange={(event) => handleChange('theme', event.target.value)}
          />
        ) : (
          <Paper shadow="xs" p="sm">{formData.theme}</Paper>
        )}

        <Grid gutter="md">
          <Grid.Col span={6}>
            <DatePickerInput
              label="Seminar Date"
              placeholder="Select date"
              value={formData.seminarDate}
              onChange={(date) => handleChange('seminarDate', date)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TimeInput
              label="Time"
              format="12"
              required
              value={formData.time}
              onChange={(event) => handleChange('time', event.target.value)}
            />
          </Grid.Col>
        </Grid>

        <TextInput label="Place" placeholder="Enter venue" required value={formData.place} onChange={(event) => handleChange('place', event.target.value)} />

        <Textarea label="Work Done Till Previous Semester" placeholder="Summarize previous work" autosize minRows={2} required value={formData.previousWork} onChange={(event) => handleChange('previousWork', event.target.value)} />

        <Textarea label="Specific Contribution in the Current Semester" placeholder="Summarize your contributions" autosize minRows={2} required value={formData.contribution} onChange={(event) => handleChange('contribution', event.target.value)} />

        <Textarea label="Future Plan for Work" placeholder="Summarize future work plans" autosize minRows={2} required value={formData.futurePlan} onChange={(event) => handleChange('futurePlan', event.target.value)} />

        <NumberInput label="Number of Publications/Papers Presented/Submitted" placeholder="Enter number" required value={formData.numPublications} onChange={(val) => handleChange('numPublications', val)} />

        <NumberInput label="Number of Papers Published/Accepted in Journals/Conferences" placeholder="Enter number" required value={formData.numPublished} onChange={(val) => handleChange('numPublished', val)} />

        <NumberInput label="Number of Papers Presented in Conferences/Meetings/Workshops (Unpublished)" placeholder="Enter number" required value={formData.numPresented} onChange={(val) => handleChange('numPresented', val)} />

        <NumberInput label="Number of Papers Submitted (Under Review)" placeholder="Enter number" required value={formData.numSubmitted} onChange={(val) => handleChange('numSubmitted', val)} />

        <FileInput
          label="Upload PDF"
          placeholder="Upload your seminar report"
          accept="application/pdf"
          onChange={(file) => handleChange('pdfFile', file)}
        />

        <Group position="center" mt="lg">
          <Button size="md" variant="filled" color="blue" onClick={handleSubmit}>Submit</Button>
        </Group>
      </Paper>
    </Container>
  );
}
