
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { resumeData, projects } from '@/lib/data';

// Register fonts if needed, but we'll use defaults for now to ensure compatibility
// standard fonts like Helvetica are always available

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontFamily: 'Helvetica-Bold',
        color: '#4A5568',
        letterSpacing: 2,
        marginBottom: 4,
    },
    contactInfo: {
        fontSize: 9,
        color: '#718096',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    section: {
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#2D3748',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E0',
        marginBottom: 10,
        marginTop: 2,
    },
    content: {
        fontSize: 9,
        color: '#4A5568',
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#2D3748',
    },
    itemSubtitle: {
        fontSize: 9,
        fontFamily: 'Helvetica-Oblique',
        color: '#4A5568',
    },
    itemDate: {
        fontSize: 9,
        color: '#718096',
    },
    bulletPointContainer: {
        flexDirection: 'row',
        marginTop: 2,
        paddingLeft: 10,
    },
    bullet: {
        width: 10,
        fontSize: 9,
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        color: '#4A5568',
    },
    skillCategory: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    skillLabel: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        width: 120,
    },
    skillList: {
        fontSize: 9,
        flex: 1,
    },
    projectItem: {
        marginBottom: 10,
    }
});

const ResumePDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{resumeData.name}</Text>
                <View style={styles.contactInfo}>
                    <Text>{resumeData.contact.location} | </Text>
                    <Text>{resumeData.contact.phone} | </Text>
                    <Text>{resumeData.contact.email} | </Text>
                    <Text>{resumeData.contact.linkedin}</Text>
                </View>
            </View>

            <View style={styles.hr} />

            {/* Professional Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.content}>{resumeData.summary}</Text>
            </View>

            <View style={styles.hr} />

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu, index) => (
                    <View key={index}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{edu.school}</Text>
                            <Text style={styles.itemDate}>{edu.location}</Text>
                        </View>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                            <Text style={styles.itemDate}>{edu.period}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.hr} />

            {/* Academic Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Academic Experience</Text>
                {resumeData.academicExperience.map((exp, index) => (
                    <View key={index}>
                        <Text style={styles.itemTitle}>{exp.role}</Text>
                        {exp.highlights.map((highlight, hIndex) => (
                            <View key={hIndex} style={styles.bulletPointContainer}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.bulletText}>{highlight}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            <View style={styles.hr} />

            {/* Technical Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                <View style={styles.skillCategory}>
                    <Text style={styles.skillLabel}>Programming Languages:</Text>
                    <Text style={styles.skillList}>{resumeData.skills.languages.join(', ')}</Text>
                </View>
                <View style={styles.skillCategory}>
                    <Text style={styles.skillLabel}>Frameworks & Tools:</Text>
                    <Text style={styles.skillList}>{resumeData.skills.frameworks.join(', ')}</Text>
                </View>
                <View style={styles.skillCategory}>
                    <Text style={styles.skillLabel}>Databases:</Text>
                    <Text style={styles.skillList}>{resumeData.skills.databases.join(', ')}</Text>
                </View>
            </View>

            <View style={styles.hr} />

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map((project, index) => (
                    <View key={index} style={styles.projectItem}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{project.title}</Text>
                            <Text style={styles.itemDate}>{project.year}</Text>
                        </View>
                        <Text style={styles.content}>{project.description}</Text>
                        <Text style={[styles.content, { fontFamily: 'Helvetica-Oblique', marginTop: 2 }]}>
                            Tech: {project.tech.join(', ')}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ResumePDF;
