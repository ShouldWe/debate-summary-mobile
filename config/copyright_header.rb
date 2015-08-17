#
# Debate Summary Mobile - Croudsource arguments and debates
# Copyright (C) 2015 Policy Wiki Educational Foundation LTD <hello@shouldwe.org>
#
# This file is part of Debate Summary Mobile.
#
# Debate Summary Mobile is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Debate Summary Mobile is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Debate Summary Mobile.  If not, see <http://www.gnu.org/licenses/>.
#
require 'copyright_header'

args = {
  # dry_run: true,
  license: 'GPL3',
  copyright_software: 'Debate Summary Mobile',
  copyright_software_description: 'Croudsource arguments and debates',
  copyright_holders: [
    'Policy Wiki Educational Foundation LTD <hello@shouldwe.org>'
  ],
  copyright_years: ['2015'],
  add_path: %w(app/scripts app/styles app/views config test).join(':'),
  output_dir: '.'
}

command_line = CopyrightHeader::CommandLine.new(args)
command_line.execute
