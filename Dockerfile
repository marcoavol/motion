# https://docs.docker.com/engine/reference/builder/

FROM continuumio/miniconda3:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

#RUN apt-get update && apt-get upgrade -y && apt-get install -qqy \

RUN mkdir -p /backend
COPY ./backend/requirements.yml /backend/requirements.yml
RUN /opt/conda/bin/conda env create -f /backend/requirements.yml
ENV PATH /opt/conda/envs/backend-env/bin:$PATH
RUN echo 'source activate backend-env' >~/.bashrc

RUN mkdir -p /scripts
COPY ./scripts /scripts
RUN chmod +x ./scripts*  # Make scripts executable as program

COPY ./backend /backend

WORKDIR /backend

