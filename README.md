# ORCID Data Block 2

This is a WordPress plugin for displaying data from the public scope of multiple
ORCID profiles on pages, posts, and sites. It's a successor to [ORCID Data
Block][orcid_data_block]. It does not require registering or authenticating an
ORCID account. The only requirement is a [valid 16-digit ORCID iD][orcid_ids].

[orcid_data_block]: <https://github.com/MESH-Research/orcid-data-block>
[orcid_ids]: https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier

This work is funded by the [ORCID Global Participation Fund][awardees].

[awardees]: https://info.orcid.org/global-participation-fund-announces-fourth-round-of-awardees/

## Features

- Provides a Gutenberg block in the WordPress block editor that allows users to
  - specify which sections are shown from their ORCID profiles
  - specify which items are shown within sections
- Allows different ORCID profiles to be used in multiple blocks on the same post/page/site
- Info will remain automatically up-to-date with ORCID
- All languages currently supported by ORCID will be supported (in progress)
- Accessible to those with disabilities

## Information Supported

The following details information that’s available within the plugin according
to each section’s record type. Each detail is listed in the order as it appears
under each record. If any of this information is not supplied for a record in
ORCID, it will not appear for that record in the plugin.

### Biography

- Name
  - Given Names
  - Family Name
  - Credit Name
  - Other Names
- Biographical Information
- Websites & social links

### Distinction

- Role Title
- Organization Name
- Department Name
- Organization Address
  - City
  - Region
  - Country
- Dates
  - Start Date
  - End Date

### Education

- School or Organization Name
- Degree
- School or Organization Address
  - City
  - Region
  - Country
- Dates
  - Start Date
  - End Date

### Employment

- Role Title
- Organization Name
- Department Name
- Organization Address
  - City
  - Region
  - Country
- Dates
  - Start Date
  - End Date

### Funding

- Title
- Organization Name
- Type
- Dates
  - Start Date
  - End Date
- Digital Object Identifier (DOI)

### Invited Positions

- Role Title
- Organization Name
- Department Name
- Organization Address
  - City
  - Region
  - Country
- Dates
  - Start Date
  - End Date

### Memberships

- Role Title
- Organization Name
- Department Name
- Organization Address
  - City
  - Region
  - Country
- Dates
  - Start Date
  - End Date

### Peer Reviews

- Organization Name
- Role Title
- Department Name
- Review Location Address
  - City
  - Region
  - Country
- Digital Object Identifier (DOI)
- Uniform Resource Locator (URL)
- International Standard Serial Number (ISSN)
- Review Source
- Completion Date

### Qualifications

- Role Title
- Organization Name
- Department Name
- Organization Address
  - City
  - Region
  - Country
- Digital Object Identifier (DOI)
- Dates
  - Start Date
  - End Date

### Service

- Organization Name
- Role Title
- Digital Object Identifier (DOI)
- Organization Address
  - City
  - Region
  - Country
- Dates
  - Start Date
  - End Date

### Work

- Work Title
- Work Subtitle
- Journal Title
- Work Type
- Publication Date
- Digital Object Identifier (DOI)

## Installation

1. Visit this plugin's Releases page on GitHub:
    - <https://github.com/MESH-Research/orcid-data-block-2/releases>
2. Download the zip file of the latest stable release.
3. Visit the admin area of your WordPress installation.
4. On the Plugins screen, click the "Add New Plugin" button.
5. Click the "Upload Plugin" button.
6. Choose the zip file that was previously downloaded.
7. Click the "Install Now" button.

## Usage

1. Make sure the plugin is activated on your WordPress installation.
    - This can be done on the Plugins screen.
2. In a Gutenberg block editor, add a new block.
    - There are multiple ways to add blocks.
        - <https://wordpress.org/documentation/article/adding-a-new-block/>
    - Search "ORCID Data Block 2" in the block browser and select it.
3. Enter an ORCID iD in the plugin's inspector controls.
    - An ORCID iD can be found on a user's ORCID record page.
        - <https://support.orcid.org/hc/en-us/articles/360042767454-I-don-t-know-my-ORCID-ID>
4. Make customizations in the plugin's inspector controls.
    - Customize which sections are shown.
    - Customize which items within sections are shown.
5. Save as a draft or publish.

## Guide to Contributions

### Prerequisites

- Node Package Manager (npm)
- A WordPress installation
  - A Docker-managed installation is recommended

### Running Locally

1. Clone this repository into the `plugins` directory of your WordPress
   installation.
2. In a command-line, navigate to the directory of this plugin.
3. Install dependencies with `npm i`.
4. Create the build directory and files with `npm run build`.

### Contributing

1. Fork a new branch from the `main` branch.
2. Make changes to your forked branch.
3. Submit changes by opening a pull request on the Pull requests page:
   - <https://github.com/MESH-Research/orcid-data-block-2/pulls>
4. Include a description of your changes in the pull request comment.

### Code of Conduct

#### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age,
body size, disability, ethnicity, sex characteristics, gender identity and
expression, level of experience, education, socio-economic status, nationality,
personal appearance, race, religion, or sexual identity and orientation.

#### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language Being respectful of differing
- viewpoints and experiences Gracefully accepting constructive criticism
- Focusing on what is best for the community Showing empathy towards other
- community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment Publishing others' private information, such as
- a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

#### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

#### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an
appointed representative at an online or offline event. Representation of a
project may be further defined and clarified by project maintainers.

#### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at <mesh@msu.edu>. All complaints will
be reviewed and investigated and will result in a response that is deemed
necessary and appropriate to the circumstances. The project team is obligated
to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

#### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 1.4, available at
<https://www.contributor-covenant.org/version/1/4/code-of-conduct.html>

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
<https://www.contributor-covenant.org/faq>
